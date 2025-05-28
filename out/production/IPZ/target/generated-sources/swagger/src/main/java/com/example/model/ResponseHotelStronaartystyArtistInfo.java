package com.example.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * ResponseHotelStronaartystyArtistInfo
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-04-01T20:32:28.347647700+02:00[Europe/Warsaw]")


public class ResponseHotelStronaartystyArtistInfo   {
  @JsonProperty("artist_id")
  private Integer artistId = null;

  @JsonProperty("nickname")
  private String nickname = null;

  @JsonProperty("avatar_url")
  private String avatarUrl = null;

  @JsonProperty("is_followed")
  private Boolean isFollowed = null;

  public ResponseHotelStronaartystyArtistInfo artistId(Integer artistId) {
    this.artistId = artistId;
    return this;
  }

  /**
   * Get artistId
   * @return artistId
   **/
  @Schema(example = "123", description = "")
  
    public Integer getArtistId() {
    return artistId;
  }

  public void setArtistId(Integer artistId) {
    this.artistId = artistId;
  }

  public ResponseHotelStronaartystyArtistInfo nickname(String nickname) {
    this.nickname = nickname;
    return this;
  }

  /**
   * Get nickname
   * @return nickname
   **/
  @Schema(example = "@jan_kowalski", description = "")
  
    public String getNickname() {
    return nickname;
  }

  public void setNickname(String nickname) {
    this.nickname = nickname;
  }

  public ResponseHotelStronaartystyArtistInfo avatarUrl(String avatarUrl) {
    this.avatarUrl = avatarUrl;
    return this;
  }

  /**
   * Get avatarUrl
   * @return avatarUrl
   **/
  @Schema(example = "https://example.com/avatars/jan_kowalski.png", description = "")
  
    public String getAvatarUrl() {
    return avatarUrl;
  }

  public void setAvatarUrl(String avatarUrl) {
    this.avatarUrl = avatarUrl;
  }

  public ResponseHotelStronaartystyArtistInfo isFollowed(Boolean isFollowed) {
    this.isFollowed = isFollowed;
    return this;
  }

  /**
   * Get isFollowed
   * @return isFollowed
   **/
  @Schema(example = "true", description = "")
  
    public Boolean isIsFollowed() {
    return isFollowed;
  }

  public void setIsFollowed(Boolean isFollowed) {
    this.isFollowed = isFollowed;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ResponseHotelStronaartystyArtistInfo responseHotelStronaartystyArtistInfo = (ResponseHotelStronaartystyArtistInfo) o;
    return Objects.equals(this.artistId, responseHotelStronaartystyArtistInfo.artistId) &&
        Objects.equals(this.nickname, responseHotelStronaartystyArtistInfo.nickname) &&
        Objects.equals(this.avatarUrl, responseHotelStronaartystyArtistInfo.avatarUrl) &&
        Objects.equals(this.isFollowed, responseHotelStronaartystyArtistInfo.isFollowed);
  }

  @Override
  public int hashCode() {
    return Objects.hash(artistId, nickname, avatarUrl, isFollowed);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ResponseHotelStronaartystyArtistInfo {\n");
    
    sb.append("    artistId: ").append(toIndentedString(artistId)).append("\n");
    sb.append("    nickname: ").append(toIndentedString(nickname)).append("\n");
    sb.append("    avatarUrl: ").append(toIndentedString(avatarUrl)).append("\n");
    sb.append("    isFollowed: ").append(toIndentedString(isFollowed)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
