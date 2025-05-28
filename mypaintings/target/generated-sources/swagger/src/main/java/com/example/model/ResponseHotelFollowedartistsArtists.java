package com.example.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * ResponseHotelFollowedartistsArtists
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-05-28T06:59:25.623324300+02:00[Europe/Warsaw]")


public class ResponseHotelFollowedartistsArtists   {
  @JsonProperty("id_artysty")
  private Integer idArtysty = null;

  public ResponseHotelFollowedartistsArtists idArtysty(Integer idArtysty) {
    this.idArtysty = idArtysty;
    return this;
  }

  /**
   * Get idArtysty
   * @return idArtysty
   **/
  @Schema(example = "123", description = "")
  
    public Integer getIdArtysty() {
    return idArtysty;
  }

  public void setIdArtysty(Integer idArtysty) {
    this.idArtysty = idArtysty;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ResponseHotelFollowedartistsArtists responseHotelFollowedartistsArtists = (ResponseHotelFollowedartistsArtists) o;
    return Objects.equals(this.idArtysty, responseHotelFollowedartistsArtists.idArtysty);
  }

  @Override
  public int hashCode() {
    return Objects.hash(idArtysty);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ResponseHotelFollowedartistsArtists {\n");
    
    sb.append("    idArtysty: ").append(toIndentedString(idArtysty)).append("\n");
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
